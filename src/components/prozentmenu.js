import prozent from './prozent';
export default function prozentmenu() {
    return(
        <>
            <div>
                "Das ist das Menue"
                <p>zweite Zeile</p>
                <button name="sub1" onClick={()=>prozent()}>Wahl</button>
            </div>
        </>
    )
}