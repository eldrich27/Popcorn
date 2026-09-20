

export function MovieDetails({selectedID, onClose}:{selectedID:string; onClose:()=>void}){
    return(
        <div className="details">
            <button className="btn-back" onClick={onClose}>&larr;</button>
            {selectedID}
        </div>
    );
}