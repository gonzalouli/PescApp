import { IonButton } from "@ionic/react";
import React, { Fragment, useState } from "react";
import { Redirect } from "react-router";

export default function LogOutButton() {
  const [logout, setLogout] = useState<boolean>(false);

  const handleLogOut = () => {
    setLogout(true);
  };

  return (
    <Fragment>
      {logout && <Redirect to="/" push={true} exact={true} />}
      <IonButton onClick={() => handleLogOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-logout"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#000000"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
          <path d="M7 12h14l-3 -3m0 6l3 -3" />
        </svg>
      </IonButton>
    </Fragment>
  );
}
