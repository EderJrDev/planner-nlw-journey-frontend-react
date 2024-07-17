import { format } from "date-fns";
import { Calendar, MapPin, Settings2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface DestinationAndDateHeaderProps {
  id: number,
  destination: string,
  starts_at: string,
  ends_at: string,
  is_confirmed: boolean
}

export function DestinationAndDateHeader() {
  const tripId = useParams().tripId  
  const [destination, setDestination] = useState('')
  const [activities, setActivities] = useState<DestinationAndDateHeaderProps>()
  const [modalEditTrip, setModalEditTrip] = useState(false)
  const [eventStartAndEndDates, setEventStartAndendDates] = useState<DateRange | undefined>()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openModalEditTrip() {
    setModalEditTrip(true)
  }
  
  function closeModalEditTrip() {
    setModalEditTrip(false)
  }

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  async function getActivities() {
      const activities = await api.get(`/trips/${tripId}`)
      setActivities(activities.data.trip)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await api.put(`/trips/${tripId}`, {
      destination: destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to
    })  

    getActivities()
    closeModalEditTrip()
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
  ? format(eventStartAndEndDates.from, "dd/MM").concat(' até ').concat(format(eventStartAndEndDates.to, "dd/MM")) 
  : null

  useEffect(() => {
    getActivities()
  }, [])
  
  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className=" size-5 text-zinc-400" />
        <span className="text-zinc-100">{activities?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{activities && format(activities.starts_at ,'dd-MM')} a {activities && format(activities.ends_at ,'dd-MM')}</span>
        </div>

        <div className="w-px h-6 bg0zinc-800" />

        <Button onClick={openModalEditTrip} variant="secundary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>

      {modalEditTrip && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Alterar local/data</h2>
                <button onClick={closeModalEditTrip}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>  
              <p className="text-sm text-zinc-400">
                Atualize as informações.
              </p>
            </div>
    
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <MapPin className="size-5 text-zinc-400" />
                  <input 
                    type="text" 
                    value={destination ? destination : activities?.destination}
                    placeholder="Para onde você vai?"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                    onChange={event => setDestination(event.target.value)}
                  />
              </div>
    
              <div className="flex items-center gap-2">
                <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <button type="button" onClick={openDatePicker} className="flex items-center gap-2 text-left">
                  <Calendar className="size-5 text-zinc-400" />
                  <span className="text-lg text-zinc-400 w-40 flex-1">
                    {displayedDate ? displayedDate : activities && format(activities.starts_at ,'dd-MM') + ' a ' + format(activities.ends_at ,'dd-MM')}
                  </span>
                </button>
                </div>
              </div>
              <Button type="submit" variant="primary" size="full">
                Atualizar
              </Button>
            </form>
          </div>
          </div>
      )}
      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data:</h2>
                <button onClick={closeDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>  
            </div>

            <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndendDates}  />
          </div>
        </div>
      )} 
    </div>




      // <div className="w-px h-6 bg0zinc-800" />
  )
}