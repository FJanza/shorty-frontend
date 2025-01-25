import {getIdToken, User} from "firebase/auth";

export const GetAllShortys = async (user: User | null) => {
  if (!user) return {error: "User not found"};

  const token = await getIdToken(user);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await (
    await fetch(
      "https://shoorty.onrender.com/slug/",
      requestOptions as RequestInit
    )
  ).json();
};

export const DeleteShorty = async (user: User | null, slug: string) => {
  if (!user) return {error: "User not found"};

  const token = await getIdToken(user);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  return await (
    await fetch(
      `https://shoorty.onrender.com/slug/?slug=${slug}`,
      requestOptions as RequestInit
    )
  ).json();
};

export const AddShorty = async (
  user: User | null,
  url: string,
  slug: string,
  description: string
) => {
  if (!user) return {error: "User not found"};

  const token = await getIdToken(user);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${token}`);

  const body = JSON.stringify({
    url: url,
    slug: slug,
    description: description,
    viewQuantity: 0,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: body,
    redirect: "follow",
  };

  return await (
    await fetch(
      "https://shoorty.onrender.com/slug/",
      requestOptions as RequestInit
    )
  ).json();
};

export const EditShorty = async (
  user: User | null,
  url: string,
  slug: string,
  description: string
) => {
  if (!user) return {error: "User not found"};

  const token = await getIdToken(user);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${token}`);

  const raw = JSON.stringify({
    url: url,
    description: description,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await (
    await fetch(
      `https://shoorty.onrender.com/slug/?slug=${slug}`,
      requestOptions as RequestInit
    )
  ).json();
};
