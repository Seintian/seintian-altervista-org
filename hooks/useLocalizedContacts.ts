import { useTranslation } from "react-i18next";
import { ContactItem } from "@/types/portfolio";

export function useLocalizedContacts(contacts?: ContactItem[]): ContactItem[] {
    const { i18n } = useTranslation();
    const currentLang = (i18n.language || "en").toLowerCase();

    if (!contacts) return [];

    return contacts.map((contact) => {
        if (contact.id === "cv" && contact.localizedUrls) {
            const localizedUrl = currentLang.startsWith("it")
                ? contact.localizedUrls.it
                : contact.localizedUrls.en;
            return {
                ...contact,
                url: localizedUrl
            };
        }
        return contact;
    });
}
