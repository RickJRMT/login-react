import { Header } from "./Heaer";

export const Layout = ({children}) =>{
    return(
        <div>
            <Header />
            <main style={{padding: "20px"}}>
                {children}
            </main>
        </div>
    )
}