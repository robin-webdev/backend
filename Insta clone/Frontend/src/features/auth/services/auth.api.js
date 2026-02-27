import axios from "axios";

export async function register(name, username, email, password, profileImage) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register/",
      {
        name,
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message

      
    );
  }
}
