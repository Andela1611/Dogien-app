import React from "react";

interface CustomErrorProps {
  statusCode: number;
}

const CustomError: React.FC<CustomErrorProps> = ({ statusCode }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">{statusCode} - Server Error</h1>
      <p className="text-lg text-gray-600">
        Something went wrong on the server. Please try again later.
      </p>
    </div>
  );
};

export default CustomError;
