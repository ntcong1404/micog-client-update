import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };

  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-red-500 text-9xl py-4">404</h1>

        <p className="text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can't find that page.</p>

        <div
          onClick={returnHome}
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Go Back Home
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
