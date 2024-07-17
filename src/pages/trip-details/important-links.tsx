import { Link2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { useLinks } from "../../context/links/use-links";
import { CreateLinkModal } from "./create-link-modal";

export function ImportantLinks() {
  const { links, fetchLinks } = useLinks()
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false)

  const { tripId } = useParams<{ tripId: string }>();

  function openCreateLinkModal() {
    setShowCreateLinkModal(true)
  }

  function closeCreateLinkModal() {
    setShowCreateLinkModal(false)
  }

  useEffect(() => {
    if (tripId) {
      fetchLinks();
    }
  }, [tripId]);

  return (
    <div className="space-y-6">
    <h2 className="font-semibold text-xl">Links importantes</h2>
    <div className="space-y-5">
      {links?.map((link) => (  
        <div key={link.url} className="flex items-center justify-between gap-4">
          <>
          <div key={link.url} className="space-y-1.5">
            <span className="block font-medium text-zinc-100">{link.title}</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              {link.url}
            </a>
          </div>
          <Link2 className="size-5 text-zinc-400 shrink-0" />
        </>
      </div>
      ))}
    </div>
    <Button onClick={openCreateLinkModal}  variant="secundary" size="full">
      <Plus className="size-5" />
      Cadastrar novo link
    </Button>
    {showCreateLinkModal && (
          <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
    )}
  </div>
  
  )
}