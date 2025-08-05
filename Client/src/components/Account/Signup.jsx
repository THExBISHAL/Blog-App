import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { API } from "@/service/api";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function Signup() {
  const initialSignupState = {
    username: "",
    email: "",
    password: "",
  };

  const [signupData, setSignupData] = useState(initialSignupState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signupData);

    if (response?.isSuccess) {
      toast(response.data.message);
      setError("");
      setSignupData(initialSignupState);
      navigate("/login");
    } else {
      toast(response.message);
      setError("An error occurred during signup");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-200 ">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your name, email and new password to create account
          </CardDescription>
          <CardAction>
            <div className="mt-2 text-right">
              <Button variant="link" asChild>
                <a href="/login">Login</a>
              </Button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          {/* <form> */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => {
                  onInputChange(e);
                }}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="johndoe@example.com"
                required
                onChange={(e) => {
                  onInputChange(e);
                }}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={(e) => {
                  onInputChange(e);
                }}
              />
            </div>
          </div>
          {/* </form> */}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            className="w-full"
            onClick={() => {
              signupUser();
            }}
          >
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;
