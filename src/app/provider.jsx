"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    try {
      const result = await axios.post("/api/user", {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        number: user?.phoneNumbers?.[0]?.phoneNumber || "", // optional: adds phone if available
      });

      console.log(result.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
