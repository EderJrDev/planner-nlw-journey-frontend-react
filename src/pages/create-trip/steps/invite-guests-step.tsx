import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
  emailToInvite: string[]
  openGuestsModal: () => void
  openConfirmTripModal: () => void
}
export function InviteGuestsStep ({ emailToInvite, openGuestsModal, openConfirmTripModal }: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button type="submit" onClick={openGuestsModal} className="flex items-center gap-2 flex-1 text-left">
        <UserRoundPlus className="size-5 text-zinc-400" />
      {emailToInvite.length > 0 ? (
        <span className="text-zinc-100">{emailToInvite.length} pessoa(s) convidado(s)</span>
      ) : (
        <span className="text-zinc-400 text-lg flex-1">Quem estará na viagem?</span>
      )}
      </button>

    <div className="w-px h-6 bg0zinc-800" />
    <Button onClick={openConfirmTripModal} variant="primary">
      Confirmar viagem
      <ArrowRight className="size-5 text-lime-950" />
    </Button>
  </div>
  )
}