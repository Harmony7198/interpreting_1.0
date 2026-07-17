export function exportTranslations(translations) {

    const json = JSON.stringify(
        translations,
        null,
        2
    );

    const blob = new Blob(
        [json],
        {
            type: "application/json"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

const date =
    new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");

link.download =
    `translations-${date}.json`;

    link.click();

    URL.revokeObjectURL(url);

}