import React from "react";

interface LoaderProps {
  src?: string;
  
}

export default function Loader(props: LoaderProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {props.src ? (
        <img src={props.src} />
      ) : (
        <div className="flex space-x-2">
          <div className="h-8 w-8 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 animate-bounce rounded-full bg-green-500 [animation-delay:-0.15s]"></div>
          <div className="w-8 h-8 bg-red-500 rounded-full animate-bounce"></div>
        </div>
      )}
    </div>
  );
}
