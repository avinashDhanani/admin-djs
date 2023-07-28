import { AdminNav, Booking } from "../../components"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { GET_USER_DETAILS, GET_USER_BOOKINGS } from "../../constant/constants"
import axios from "axios"

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({ djName: '', email: '', zipCode: '', createdAt: '' })
  const [userBookings, setUserBookings] = useState([])
  const { id } = useParams()
  const [loading, setLoading] = useState(true)

  const { user } = useSelector((state) => state.auth);
  const fetchData = async (LINK) => {
    try {
      const response = await axios.get(LINK, { headers: { Authorization: `Bearer ${user.data.token}` }, });
      return response.data.data
    }
    catch (err) { }
  }

  useEffect(() => {
    fetchData(`${GET_USER_DETAILS}${id}`)
      .then(res => setUserDetails(res.dj))
      .catch(err => err)

    fetchData(`${GET_USER_BOOKINGS}${id}`)
      .then(res => {
        setLoading(false);
        setUserBookings(res.booking)
      })
      .catch()
  }, [])

  return (<>
    <AdminNav />
    <div className="mx-[41px] mt-[6em] max-sm:mx-4 max-2md:mt-[5rem] mb-[4em]">
      <h2 className="text-[30px] font-semibold font-inter uppercase mb-[33px]">
        User PROFILE
      </h2>
      <div className="rounded-3xl shadow-item-shadow mt-2 w-full min-w-[10.375rem] pb-[2em] ">
        <div className=" w-[85%] mx-auto mt-[32px] mb-[27px]">
          <div className="pt-[3em]">
            <h3 className="mb-[25px] text-[1.2em] font-bold">Basic Information</h3>
          </div>
          <div>
            <div className="mb-2"><span className="font-bold mr-4">Name </span> <span>{userDetails.djName || '-'}</span></div>
            <div className="mb-2"><span className="font-bold mr-4">Email </span> <span>{userDetails.email || '-'}</span></div>
            <div className="mb-2"><span className="font-bold mr-4">ZipCode </span> <span>{userDetails.zipCode || '-'}</span></div>
            <div className="mb-2"><span className="font-bold mr-4">D.O.J </span> <span>{userDetails.createdAt.substring(0, 10) || '-'}</span></div>
          </div>
          <div className="pt-[3em]">
            <h3 className="mb-[25px] text-[1.2em] font-bold">User Bookings</h3>
          </div>

        </div>
        <Booking loading={loading} setLoading={setLoading} userBookings={userBookings}/>
      </div>
    </div>
  </>)
}

export default UserProfile