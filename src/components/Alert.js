import React from 'react';



export default function Alert(porps) {

    const fistCap = (word) => {

        let newWord = "";

        newWord = word[0].toUpperCase();

        newWord = newWord + word.slice(1);

        return newWord;

    }

    return (
        <div style={{ height: "50px" }}>
            {porps.alert && <div>

                <div className={`alert alert-${porps.alert.type} alert-dismissible fade show`} role="alert">

                    <strong>{fistCap(porps.alert.type)} </strong> {porps.alert.message}



                </div>

            </div>}</div>

    );

}