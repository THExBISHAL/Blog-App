import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "@/service/api";
import { DataContext } from "@/context/DataProvider";
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

function Login({ setIsAuthenticated }) {
  const initialState = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(initialState);
  const [error, setError] = useState("");
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await API.userLogin(loginData);

    if (response?.isSuccess) {
      setError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
      });
      setLoginData(initialState);
      setIsAuthenticated(true);
      toast(response.data.message);
      navigate("/");
    } else {
      toast("Invalid Password");
      setError("An error occurred! please try again later");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-200 ">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email & password to login
          </CardDescription>
          <CardAction>
            <div className="mt-2 text-right">
              <Button variant="link" asChild>
                <a href="/signup">Sign Up</a>
              </Button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                  name="email"
                  value={loginData.email}
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                  name="password"
                  value={loginData.password}
                  type="password"
                  placeholder="password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            className="w-full"
            onClick={() => {
              loginUser();
            }}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
