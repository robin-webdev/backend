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
import type { LoginInputs } from "../types/auth.types.ts";
import useLogin from "@/features/shared/store/auth.store.ts";
import { toast } from "sonner";

export function Login() {
  const { register, handleSubmit } = useForm<LoginInputs>();
  const { login } = useAuth();
  const { isLoading, setError, setIsLoading, setIsLoggedIn } = useLogin();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const { usernameOrEmail, password } = data;
    setIsLoading(true);
    const response = await login(password, usernameOrEmail, usernameOrEmail);

    if (+response!.status === 200) {
      setIsLoading(false);
      setIsLoggedIn(true);
      navigate("/feed");
    } else if (response!.data.message === "User is not registered") {
      setIsLoading(false);
      toast.error(response!.data.message, { position: "top-center" });
      navigate("/register");
    } else {
      setIsLoading(false);
      setError(response!.data.message);
      toast.error(response!.data.message, { position: "top-center" });
    }
  };

  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("usernameOrEmail")}
                  id="email"
                  type="text"
                  placeholder="Email or Username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  placeholder="Password"
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
              {isLoading ? <Spinner className="size-4" /> : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;
