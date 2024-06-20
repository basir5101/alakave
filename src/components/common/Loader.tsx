import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-accent"></div>
    </div>
  );
}
