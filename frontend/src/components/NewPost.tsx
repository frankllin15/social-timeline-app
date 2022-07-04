import { useState } from "react";
import { useQueryClient } from "react-query";
import {
  CreateCommentInput,
  CreatePostInput,
  useCreatePostMutation,
} from "../lib/graphql/generated";
import graphqlClient from "../lib/graphql/graphqlClient";
import { Button } from "./ui/Button";

export const NewPost = () => {
  const [form, setForm] = useState<CreatePostInput>({
    content: "",
    authorId: "",
  });
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { mutate: createPost, isLoading } =
    useCreatePostMutation(graphqlClient);
  const queryClient = useQueryClient();
  function handleSubmit(e: any) {
    e.preventDefault();
    createPost(
      { input: { ...form, authorId: user.id || "" } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("Posts");
          setForm({ content: "", authorId: "" });
        },
      }
    );
  }

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <form
      className="w-full flex flex-col sm:flex-row   gap-4 sm:items-end my-8"
      onSubmit={handleSubmit}
    >
      <textarea
        className="flex-1 p-3  min-h-[100px] rounded-md shadow-md resize-none"
        required
        name="content"
        placeholder="O que você tem em mente?"
        value={form.content || ""}
        onChange={handleChange}
      />
      <Button type="submit" loading={isLoading}>
        Publicar
      </Button>
    </form>
  );
};
