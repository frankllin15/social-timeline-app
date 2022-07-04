import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";
import { UpdatePublicationInput } from "../lib/graphql/generated";
import { Alert } from "./ui/Alert";
import { PencilAltIcon } from "./icons/PencilAltIcon";
import { Button } from "./ui/Button";

const Trigger = () => (
  <i
    className="text-zinc-500 hover:text-zinc-600"
    aria-label="Editar comentário"
    title="Editar comentário"
  >
    <PencilAltIcon className="h-7 w-7 " />
  </i>
);

type Props = {
  item: {
    content: string;
    id: string;
    __typename?: string;
  };
  handleSubmit: (data: UpdatePublicationInput, callback: () => void) => void;
  isLoading: boolean;
};

export const UpdatePublication: React.FC<Props> = ({
  item,
  handleSubmit,
  isLoading,
}) => {
  const [form, setForm] = useState<UpdatePublicationInput>({
    content: item.content,
    pubId: item.id,
  });
  const [open, setOpen] = useState(false);

  function handleChange(e: React.ChangeEvent<any>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function _handleSubmit(e: React.FormEvent<any>) {
    e.preventDefault();
    handleSubmit(form, handleClose);
    // setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Alert
      open={open}
      setOpen={setOpen}
      title={item.__typename == "Comment" ? "Editar comentário" : "Editar Post"}
      trigger={<Trigger />}
    >
      <form className="w-full flex flex-col  gap-8 sm:items-end my-8">
        <textarea
          className="flex-1 w-full p-3  min-h-[100px] rounded-md shadow-md resize-none"
          required
          name="content"
          value={form.content || ""}
          placeholder="Sua resposta"
          onChange={handleChange}
        />
        <div className="self-end flex gap-4">
          <Button onClick={handleClose} variant="dark">
            Cancelar
          </Button>
          <Button loading={isLoading} onClick={_handleSubmit}>
            Publicar
          </Button>
        </div>
      </form>
    </Alert>
  );
};
