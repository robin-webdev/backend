import { useForm, type SubmitHandler } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.ts";
// form fields are dynamic so use any to avoid type errors
import useLogin from "@/features/shared/store/auth.store.ts";
import { toast } from "sonner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { useState } from "react";
import type { RegisterInputs } from "../types/auth.types.ts";
import { registerAPI } from "../services/auth.api.ts";

export function Register() {
  const { register, handleSubmit } = useForm<RegisterInputs>();
  const { registerUser } = useAuth();
  const { isLoading, setError, setIsLoading, setIsLoggedIn } = useLogin();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string>(
    "https://ik.imagekit.io/robinrangaspace/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg?updatedAt=1770748152371",
  );

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    let { name, email, username, image, password } = data;

    setIsLoading(true);
    const response = await registerUser(
      name,
      username,
      email,
      password,
      image[0],
    );

    console.log(response);

    if (+response!.status === 201) {
      setIsLoading(false);
      setIsLoggedIn(true);
      navigate("/feed");
    } else if (response!.data.message === "User already exists") {
      setIsLoading(false);
      toast.error(response!.data.message, { position: "top-center" });
      navigate("/login");
    } else {
      setIsLoading(false);
      setError(response!.data.message);
      toast.error(response!.data.message, { position: "top-center" });
    }
  };

  return (
    <div className="flex overflow-hidden py-9   items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Provide your details to register a new account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </CardAction>
        </CardHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="profileImage">
                  <Avatar>
                    <AvatarImage
                      src={profileImage}
                      alt="@shadcn"
                      className="object-cover object-center"
                    />
                    <AvatarFallback>PF</AvatarFallback>
                  </Avatar>
                  <div>Choose Profile Picture</div>
                </Label>
                <Input
                  hidden
                  {...register("image", {
                    onChange: (e) => handleImageInput(e),
                  })}
                  id="profileImage"
                  type="file"
                  accept="image/*"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...register("username")}
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  placeholder="Create a password"
                  {...register("password")}
                  id="password"
                  type="password"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full disabled:opacity-100 disabled:bg-[#2E2E2E]"
            >
              {isLoading ? <Spinner className="size-4" /> : "Register"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Register;
