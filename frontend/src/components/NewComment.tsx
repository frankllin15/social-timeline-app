import { useState } from "react";
import { useCreateCommentMutation } from "../lib/graphql/generated";
import graphqlClient from "../lib/graphql/graphqlClient";
import { useQueryClient } from "react-query";
import { Button } from "./ui/Button";

export const NewComment = ({ postId }: { postId: string }) => {
  const [form, setForm] = useState({
    content: "",
    authorId: "",
  });

  const queryClient = useQueryClient();

  const { mutate: createComment, isLoading } =
    useCreateCommentMutation(graphqlClient);

  function handleChange(e: React.ChangeEvent<any>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  function handleSubmit(e: any) {
    e.preventDefault();
    createComment(
      {
        input: {
          ...form,
          authorId: user.id,
          postId,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("Post");
          setForm({ content: "", authorId: "" });
        },
      }
    );
  }
  return (
    <form
      className="w-full flex flex-col sm:flex-row   gap-4 sm:items-end my-8"
      onSubmit={handleSubmit}
    >
      <textarea
        value={form.content}
        className="flex-1 p-3  min-h-[100px] rounded-md shadow-md resize-none"
        required
        name="content"
        placeholder="Sua resposta"
        onChange={handleChange}
      />
      <Button type="submit" loading={isLoading}>
        Publicar
      </Button>
    </form>
  );
};
