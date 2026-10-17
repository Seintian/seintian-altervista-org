import { ContactItem } from "@/types/portfolio";

export const contacts: ContactItem[] = [
    {
        id: "email",
        labelKey: "contacts.email",
        url: "mailto:seintian@altervista.org",
        isPrimary: true
    },
    {
        id: "github",
        labelKey: "contacts.github",
        url: "https://github.com/Seintian",
        isPrimary: false
    },
    {
        id: "linkedin",
        labelKey: "contacts.linkedin",
        url: "https://linkedin.com/in/christian-santarelli-4290ab19a/",
        isPrimary: false
    },
    {
        id: "cv",
        labelKey: "contacts.cv",
        url: "/christian_santarelli_en_cv_17-10-26.pdf",
        isPrimary: false,
        localizedUrls: {
            en: "/christian_santarelli_en_cv_17-10-26.pdf",
            it: "/christian_santarelli_cv_17-10-26.pdf"
        }
    }
];

export function getLocalizedCvUrl(locale?: string): string {
    const cvContact = contacts.find((c) => c.id === "cv");
    if (!cvContact) return "/christian_santarelli_en_cv_17-10-26.pdf";
    if (cvContact.localizedUrls) {
        if (locale?.toLowerCase().startsWith("it")) {
            return cvContact.localizedUrls.it;
        }
        return cvContact.localizedUrls.en;
    }
    return cvContact.url;
}
