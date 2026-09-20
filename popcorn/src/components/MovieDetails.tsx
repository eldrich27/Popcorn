

export function MovieDetails({selectedID}:{selectedID:string}){
    return(
        <div className="details">
            <button className="btn-back">&larr;</button>
            {selectedID}
        </div>
    );
}