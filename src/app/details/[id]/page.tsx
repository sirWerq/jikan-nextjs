"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function DetailsPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <h1>Detail Page</h1>
      <p>ID: {id}</p>
    </div>
  );
}
