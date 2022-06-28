import type { GetServerSideProps, NextPage } from "next"

const profile: NextPage<Props> = ({ }) => {
    return (
        <div>profile</div>
    )
}


interface Props {

}


// export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
//     return {
//         props: {

//         }
//     }
// }

export default profile