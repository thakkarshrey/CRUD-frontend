import { Button, ButtonContainer } from "./Pagination.styled"

function Pagination({currentPage, onPageChange, limit, total}){
    const pageCount = Math.ceil(total/limit)
    const pagesArr = range(1, pageCount)
    const indexOfPage = currentPage * limit
    console.log(currentPage, pageCount)
    return (
        <>
        <ButtonContainer>
        <Button onClick={()=>onPageChange(currentPage - 1)} disabled={currentPage === 1}><b>{`<`}</b> </Button>
        {
            pagesArr?.map((page)=>{
                return <Button key={page} onClick={()=>onPageChange(page)}><b>{page}</b> </Button>
            })
        }
        <Button onClick={()=>onPageChange(currentPage + 1)} disabled={currentPage === pageCount}><b>{`>`}</b></Button>
        </ButtonContainer>
        </>
    )
}


export default Pagination

const range = (start, end) => {
    return [...Array(end).keys()].map(el=>el+start)
}
// Making an array of one number = [...Array(5).keys()] // this will return an array [0,1,2,3,4]