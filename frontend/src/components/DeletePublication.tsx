import { TrashIcon } from "./icons/TrashIcon";

export const DeletePublication = ({
  handleDelete,
}: {
  handleDelete: () => void;
}) => (
  <button
    className="text-zinc-500 hover:text-zinc-600"
    aria-label="Excluir comentário"
    onClick={handleDelete}
    title="Excluir comentário"
  >
    <TrashIcon className="h-7 w-7 " />
  </button>
);
