import { Post, usePostsQuery } from "../../lib/graphql/generated";
import { NewPost } from "../NewPost";
import graphqlClient from "../../lib/graphql/graphqlClient";
import { PostItem } from "../PostItem";

export const Home = () => {
  const { data, isLoading } = usePostsQuery(
    graphqlClient,
    {
      input: { take: 100 },
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className="flex flex-col items-center justify-center container main-container py-8">
      <h1 className="text-3xl self-start text-neutral-100 font-semibold">
        Página inicial
      </h1>
      <NewPost />
      <div className="w-full">
        {isLoading ? (
          <div>Carregando...</div>
        ) : (
          data?.posts.__typename === "PostList" &&
          (data.posts.items?.length! > 0 ? (
            data.posts?.items?.map(
              (post: any) => post && <PostItem key={post.id} post={post} />
            )
          ) : (
            <h2 className="text-white font-semibold text-center text-2xl md:text-3xl">
              Nenhum post encontrado. Seja o primeiro a publicar!
            </h2>
          ))
        )}
      </div>
    </div>
  );
};
