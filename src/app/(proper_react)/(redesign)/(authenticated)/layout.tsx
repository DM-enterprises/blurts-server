/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/utils/auth";
import { AutoSignIn } from "../../../components/client/AutoSignIn";

export default async function Layout(props: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <AutoSignIn />;
  }

  return <>{props.children}</>;
}
