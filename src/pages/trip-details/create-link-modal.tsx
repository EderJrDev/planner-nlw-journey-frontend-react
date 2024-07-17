import { Tag, User, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/button";
import { useLinks } from "../../context/links/use-links";
import { api } from "../../lib/axios";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void
}

export function CreateLinkModal({ closeCreateLinkModal }: CreateLinkModalProps) {
  const tripId = useParams().tripId
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const { fetchLinks } = useLinks();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  
    console.log(title, url)

    const data = await api.post(`/trips/${tripId}/links`, {
      title: title,
      url: url
    })  

    console.log(data)
    
    fetchLinks();
    closeCreateLinkModal()
  }
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
    <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cadastrar link</h2>
          <button onClick={closeCreateLinkModal}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>  
        <p className="text-sm text-zinc-400">
          Todos convidados podem visualizar as atividades.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Tag className="text-zinc-400 size-5" />
          <input
            name="title"
            placeholder="Qual o nome" 
            className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            onChange={event => setTitle(event.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
            name="title"
            placeholder="Qual o link" 
            className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            onChange={event => setUrl(event.target.value)}
          />
          </div>
        </div>
        <Button type="submit" variant="primary" size="full">
          Salvar link
        </Button>
      </form>
    </div>
  </div>
  )
}