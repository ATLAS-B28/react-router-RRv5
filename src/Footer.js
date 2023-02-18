import { useStoreState } from "easy-peasy";
const Footer = () => {
    const postIdCount = useStoreState((state)=> state.postIdCount)
    return (
        <footer className='Footer'>
            <p>{postIdCount} Blog Posts</p>
        </footer>
    )
}

export default Footer
