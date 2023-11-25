import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Helmet>
        <title>Error page | Banglamart E-commerce</title>
      </Helmet>
      <img
        src='https://i.ibb.co/LtLVCRg/9-404-error-illustration-2048x908-vp03fkyu.png'
        alt="Error Illustration"
        className="w-64 h-auto mb-4"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops! Something went wrong.</h1>
      <p className="text-gray-600 text-lg mb-4">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn hover:underline bg-MainColor text-CardColor hover:text-TextColor">Go back to home</Link>
    </div>
  );
};

export default ErrorPage;
