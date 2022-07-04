import {
  Post,
  UpdatePublicationInput,
  useDeletePostMutation,
  useUnlikePostMutation,
  useUpdatePostMutation,
} from "../lib/graphql/generated";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useLikePostMutation } from "../lib/graphql/generated";
import graphqlClient from "../lib/graphql/graphqlClient";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { LikeFillIcon, LikeIcon } from "./icons/LikeIcon";
import { ChatIcon } from "./icons/ChatIcon";
import { UpdatePublication } from "./UpdatePublication";
import { TrashIcon } from "./icons/TrashIcon";
import { DeletePublication } from "./DeletePublication";

export const PostItem = ({
  post,
  isPreview = true,
}: {
  post: Post;
  isPreview?: boolean;
}) => {
  const { mutate: likePost, isLoading: isLikeLoading } =
    useLikePostMutation(graphqlClient);
  const { mutate: unlikePost } = useUnlikePostMutation(graphqlClient);
  const { mutate: updatePost, isLoading: isUpdateLoading } =
    useUpdatePostMutation(graphqlClient);
  const { mutate: deletePost } = useDeletePostMutation(graphqlClient);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const queryClient = useQueryClient();

  function toggleLike() {
    if (post.likes?.some((like) => like?.author?.id === user.id)) {
      unlikePost(
        { input: { authorId: user.id, postId: post.id } },
        {
          onSuccess: (data) => {
            if (data.unlikePost.success)
              queryClient.invalidateQueries(isPreview ? "Posts" : "Post");
          },
        }
      );
    } else {
      likePost(
        { input: { authorId: user.id, postId: post.id } },
        {
          onSuccess: (data) => {
            if (data.likePost.success)
              queryClient.invalidateQueries(isPreview ? "Posts" : "Post");
          },
        }
      );
    }
  }

  function handleUpdate(data: UpdatePublicationInput, callback: () => void) {
    updatePost(
      { input: data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("Posts");
          callback();
        },
      }
    );
  }

  function handleDelete() {
    if (confirm("Tem certeza que deseja excluir essa publicação?")) {
      deletePost(
        { deletePostId: post.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("Posts");
          },
        }
      );
    }
  }

  const isPostLiked = post.likes?.some((like) => like?.author?.id === user.id);

  return (
    <div className="p-3 rounded-md my-2 bg-white w-full">
      <header className="flex justify-between">
        <div className="flex items-center gap-2">
          <address className="font-semibold">
            {post.author?.name} {post.author?.id === user.id ? "(Você)" : ""}
          </address>
          •
          <time className="font-semibold">
            {formatDistanceToNow(parseISO(post.updatedAt), {
              locale: ptBR,
            })}
          </time>
        </div>
        {post.author?.id === user.id && (
          <div className="flex gap-2">
            <UpdatePublication
              handleSubmit={handleUpdate}
              isLoading={isUpdateLoading}
              item={post}
            />
            <DeletePublication handleDelete={handleDelete} />
          </div>
        )}
      </header>
      <div className="p-4">
        <Link to={`/p/${post.id}`}>
          <pre
            className={`max-h-screen text-lg leading-6  ${
              isPreview && "line-clamp-[12]"
            }`}
          >
            {post.content}
          </pre>
        </Link>
      </div>
      <hr className=" w-full" />
      <div className="flex w-full items-center gap-2 font-semibold text-xs sm:text-sm">
        <p className="my-2 font-semibold">
          {
            // Se o usuario curtiu o post
            isPostLiked
              ? post?.likes?.length! > 1
                ? `Você e outras ${post.likes?.length! - 1} pessoas curtiram`
                : "Você curtiu"
              : // Se o usuario não curtiu o post

                `${post.likes?.length} 
                ${post.likes?.length === 1 ? "curtida" : "curtidas"}`
          }
        </p>
        •
        <p>
          {post.comments?.length}{" "}
          {post.comments?.length === 1 ? "comentário" : "comentários"}
        </p>
      </div>
      <div className="flex w-full gap-4 font-semibold ">
        <button
          disabled={isLikeLoading}
          className=" py-2 px-3 hover:bg-neutral-200 rounded-md"
          onClick={toggleLike}
        >
          {isPostLiked ? (
            <i className="flex gap-2 item-center text-blue-500">
              <LikeFillIcon className="h-7 " />
              Gostei
            </i>
          ) : (
            <i className="flex gap-2 item-center text-zinc-700">
              <LikeIcon className="h-7 " />
              Gostei
            </i>
          )}
        </button>
        {isPreview && (
          <Link to={`/p/${post.id}`}>
            <button className="py-2 px-3 hover:bg-neutral-200 rounded-md">
              <i className="flex gap-2 item-center text-zinc-700">
                <ChatIcon className="h-7" />
                Comentar
              </i>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
