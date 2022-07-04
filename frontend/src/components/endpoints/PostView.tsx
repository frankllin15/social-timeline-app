import { usePostQuery } from "../../lib/graphql/generated";
import { NewComment } from "../NewComment";
import { NewPost } from "../NewPost";
import { PostItem } from "../PostItem";
import graphqlClient from "../../lib/graphql/graphqlClient";
import { useParams } from "react-router-dom";
import { CommentItem } from "../CommentItem";

export const PostView = () => {
  const params = useParams();
  const { data } = usePostQuery(graphqlClient, { postId: params.postId || "" });

  return (
    <div className="flex-1 main-container py-8">
      {data?.post?.__typename === "Post" && (
        <>
          <PostItem isPreview={false} post={data?.post as any} />
          <NewComment postId={params.postId!} />
          <div>
            {data?.post?.comments?.map((comment: any) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
