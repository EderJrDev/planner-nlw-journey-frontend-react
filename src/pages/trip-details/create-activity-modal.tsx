import { format } from "date-fns";
import { Tag, User, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/button";
import { useActivities } from "../../context/activities/use-activities";
import { api } from "../../lib/axios";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActiveModal({ closeCreateActivityModal }: CreateActivityModalProps) {
  const tripId = useParams().tripId
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const { fetchActivities } = useActivities()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
   try {
    event.preventDefault()
    setLoading(true)
    
    const formatDate = format(date, 'yyyy-MM-dd HH:mm:ss')
    console.log(title, formatDate)

    const data = await api.post(`/trips/${tripId}/activities`, {
      title: title,
      occurs_at: formatDate
    })  

    console.log(data)
    
    fetchActivities();
    closeCreateActivityModal()
   } catch (error) {
    console.log(error)
   } finally {
    setLoading(false)
   }
  }
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
    <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
          <button onClick={closeCreateActivityModal}>
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
            required
            placeholder="Qual a atividade" 
            className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            onChange={event => setTitle(event.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              required
              type="datetime-local"
              name="occurs_at"
              placeholder="Data e horário da atividade" 
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
              onChange={event => setDate(event.target.value)}
            />
          </div>
        </div>
        <Button isLoading={loading} type="submit" variant="primary" size="full">
          Salvar atividade
        </Button>
      </form>
    </div>
  </div>
  )
}