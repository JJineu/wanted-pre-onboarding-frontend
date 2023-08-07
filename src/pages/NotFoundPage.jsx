import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/signin");
  }, []);
  return <div>Not Found</div>;
}
