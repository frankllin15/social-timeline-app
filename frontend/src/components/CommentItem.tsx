import {
  Comment,
  UpdatePublicationInput,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../lib/graphql/generated";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import graphqlClient from "../lib/graphql/graphqlClient";
import { useQueryClient } from "react-query";
import { UpdatePublication } from "./UpdatePublication";
import { DeletePublication } from "./DeletePublication";

export const CommentItem = ({ comment }: { comment: Comment }) => {
  const { mutate: deleteComment } = useDeleteCommentMutation(graphqlClient);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const queryClient = useQueryClient();
  const { mutate: updateComment, isLoading: isUpdateLoading } =
    useUpdateCommentMutation(graphqlClient);

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir esse comentário?")) {
      deleteComment(
        {
          deleteCommentId: comment.id,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("Post");
          },
        }
      );
    }
  };

  const handleSubmit = (data: UpdatePublicationInput, callback: () => void) => {
    updateComment(
      {
        input: data,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("Post");
          callback();
        },
      }
    );
  };

  return (
    <div className="p-3 rounded-md my-2 bg-white w-full">
      <header className="flex justify-between">
        <div className="flex items-center gap-2">
          <address className="font-semibold">{comment.author?.name}</address>•
          <time className="font-semibold">
            {comment.updatedAt &&
              formatDistanceToNow(parseISO(comment.updatedAt), {
                locale: ptBR,
              })}
          </time>
        </div>
        {comment.author?.id === user.id && (
          <div className="flex gap-2">
            <UpdatePublication
              handleSubmit={handleSubmit}
              isLoading={isUpdateLoading}
              item={comment}
            />
            <DeletePublication handleDelete={handleDelete} />
          </div>
        )}
      </header>
      <div className="">
        <pre className="py-3">{comment.content}</pre>
      </div>
    </div>
  );
};
