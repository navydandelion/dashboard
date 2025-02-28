import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedRememberMe && storedUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const getCsrfToken = async () => {
    try {
      const response = await fetch(
        "https://d322-188-113-211-123.ngrok-free.app/api/csrf"
      );
      const data = await response.json();
      return data.csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      return null;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const csrfToken = await getCsrfToken();
      const response = await fetch(
        "https://d322-188-113-211-123.ngrok-free.app/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(csrfToken && { "X-CSRF-Token": csrfToken }),
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (response.ok) {
        setIsSignUp(false);
      } else {
        alert("Ошибка при регистрации");
      }
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://d322-188-113-211-123.ngrok-free.app/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка входа: неверные учетные данные");
      }

      const data = await response.json();

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("loggedInUser", name);
      } else {
        localStorage.setItem("rememberMe", "false");
        localStorage.removeItem("loggedInUser");
      }

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
      console.error("Ошибка входа:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <Card className="w-96 p-6 bg-black shadow-lg rounded-xl text-white hover:border-blue-900">
        <h2 className="text-2xl font-bold text-center">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <form
          onSubmit={isSignUp ? handleSignUp : handleLogin}
          className="space-y-4"
        >
          <div>
            <Label>Username</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {isSignUp && (
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isSignUp && (
            <div className="flex items-center">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked)}
              />
              <Label className="ml-2 text-lg font-medium">Remember me</Label>
            </div>
          )}
          <Button type="submit">{isSignUp ? "Sign Up" : "Login"}</Button>
        </form>
        <p className="text-center text-sm mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </Card>
    </div>
  );
}

export default Login;
