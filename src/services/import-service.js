export function importTranslations(file) {

    return new Promise(

        (resolve, reject) => {

            const reader =
                new FileReader();

            reader.onload = () => {

                try {

                    const data =
                        JSON.parse(
                            reader.result
                        );

                    resolve(data);

                }

                catch {

                    reject(
                        new Error(
                            "Invalid JSON file."
                        )
                    );

                }

            };

            reader.onerror =
                reject;

            reader.readAsText(file);

        }

    );

}