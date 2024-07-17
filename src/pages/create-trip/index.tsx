import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { ConfirmTripModal } from "./confirm-trip-modal";
import { InviteGuessModal } from "./invite-guests-modal";

import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail,setOwnerEmai] = useState('')

  const [eventStartAndEndDates, setEventStartAndendDates] = useState<DateRange | undefined>()

  const [emailToInvite, setEmailToInvite] = useState(['jessica.white44@yahoo.com'])

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }
  
  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if(!email) return

    if(emailToInvite.includes(email)) return

    setEmailToInvite([...emailToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailToInvite(email: string) {
    setEmailToInvite(emailToInvite.filter((emailToInvite) => emailToInvite !== email))
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if(!destination) {
      return
    } 

    if(!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if(emailToInvite.length === 0) {
      return
    }

    if(!ownerName || !ownerEmail) {
      return
    }
      
    const response = await api.post('/trips', {
      destination: destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to,
      owner_name: ownerName,
      owner_email: ownerEmail,
      emails_to_invite: emailToInvite
    })
    
    const { tripId } = response.data;
    navigate(`/trips/${tripId}`)
  }

  return (
  <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
    <div className="max-w-3xl w-full px-6 text-center space-y-10">
      <div className="flex flex-col items-center gap-3">
        <img src="/logo.svg" alt="plann.er" />
        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
      </div>

    <div className="space-y-4">
      <DestinationAndDateStep 
        isGuestsInputOpen={isGuestsInputOpen} 
        openGuestsInput={openGuestsInput} 
        closeGuestsInput={closeGuestsInput}
        setDestination={setDestination}
        eventStartAndEndDates={eventStartAndEndDates}
        setEventStartAndendDates={setEventStartAndendDates}
      />
      {isGuestsInputOpen && (
      <InviteGuestsStep 
        emailToInvite={emailToInvite}
        openConfirmTripModal={openConfirmTripModal}
        openGuestsModal={openGuestsModal}
      />
      )}
    </div>

    <p className="text-sm text-zinc-500">
      Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
      com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#"> políticas de privacidade.</a>
    </p>
    </div>

    {isGuestsModalOpen && (
      <InviteGuessModal 
      emailToInvite={emailToInvite}
      addNewEmailToInvite={addNewEmailToInvite}
      closeGuestsModal={closeGuestsModal}
      removeEmailToInvite={removeEmailToInvite}
      />
    )}

    {isConfirmTripModalOpen && (
      <ConfirmTripModal 
        closeConfirmTripModal={closeConfirmTripModal}
        createTrip={createTrip}
        setOwnerName={setOwnerName}
        setOwnerEmail={setOwnerEmai

        }
      />
    )}

  </div>
  )
}
