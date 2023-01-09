import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const handleCallbackResponse = (response) => {
    //console.log("Enconde JWT ID token" + response.credential)
    const body = { id_token: response.credential };
    console.log(response.credential)
    // console.log(body)
    fetch("http://localhost:3001/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log(resp);
        localStorage.setItem("token", resp);
        if(localStorage.token ) return navigate(`/local/alterHome`);
      })
      .catch(console.warn);
    document.getElementById("singInDiv").hidden = true;
    document.getElementById("btn-singOut").hidden = false;
  };

  //console.log(localStorage.user_jwt);
  
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "978651804595-3ook9f02tskqrcbdjlt3j2r1upklmdmh.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("singInDiv"), {
      theme: "outline",
      size: "large",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  useEffect(() => {
    if (localStorage.user_jwt) {
      document.getElementById("singInDiv").hidden = true;
      document.getElementById("btn-singOut").hidden = false;
    }
    if (!localStorage.user_jwt)
      document.getElementById("btn-singOut").hidden = true;
    document.getElementById("singInDiv").hidden = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  const handleSingOut = () => {
    localStorage.clear();
    document.getElementById("btn-singOut").hidden = true;
    document.getElementById("singInDiv").hidden = false;
  };

  return (
    <>
      <div id="singInDiv"></div>
      <button id="btn-singOut" onClick={handleSingOut}>
        Sing Out
      </button>

    </>
  );
};

export default Login;
