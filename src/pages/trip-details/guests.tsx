import { CheckCircle, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

export function Guests() {
interface GuestsProps {  
  id: string,
  name: string,
  email: string,
  is_confirmed: boolean
}

const [guests, setGuests] = useState<GuestsProps[]>([])
  
  const { tripId } = useParams<{ tripId: string }>();
  const fetchGuests = async () => {
    const response = await api.get(`/trips/${tripId}/participants`);
    setGuests(response.data.participants);
  };

  useEffect(() => {
    fetchGuests()
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {guests?.map(guest => (
          <div key={guest.id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{guest.name}</span>
              <span className="block text-sm text-zinc-400 truncate">
                {guest.email}
              </span>
            </div>
            {guest.is_confirmed ? (
              <CheckCircle className="size-5 text-lime-400 shrink-0" />
            ) : (
              <CircleDashed className="size-5 text-zinc-400 shrink-0" />
            )}
          </div>
        ))}
      </div>
      <Button variant="secundary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  )
}