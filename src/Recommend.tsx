import { useState, useEffect } from 'react'
import { BrowserHistory } from 'history'
import { useParams } from 'react-router-dom'
// import { useForm } from "react-hook-form";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
// import RestaurantCardList from 'RestaurantCardList'

interface Restaurant {
  restaurant_id: string
  restaurant_name: string
  restaurant_photo: string
  local_url: string
  score: number
  hashtag: string
  genre: string
  station: string
  budget_lunch: string
  use_hashtag: boolean
}

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const RestaurantCard = styled.div`
  width: fit-content;
  max-width: 40%;
  position: relative;
`

const ImageWrapper = styled.div`
  display: inline-block;
  height: 300px;
`

const RestaurantPhoto = styled.img`
  width: 100%;
  height: 100%;
`
const Forms = styled.div`
  display: flex;
  justify-content: space-between;
`
const RestaurantDelete = styled.div`
  position: absolute;
  top: 0;
  height: 0;
  text-align: right;
  z-index: 1;
`
const RecommendationDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0.5rem;
  height: 180px;
`
const RecommendationName = styled.h2`
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: black;
`
const RecommendationDetailsRow = styled.div`
  /* display: flex;
  justify-content: flex-start; */
  font-size: 0.9rem;
  color: rgb(30, 30, 30);
`
const CostStationRow = styled.div`
  display: flex;
  justify-content: space-between;
`

// async function sha256(text :string) {
//   const uint8 = new TextEncoder().encode(text);
//   const digest = await crypto.subtle.digest("SHA-256", uint8);
//   return Array.from(new Uint8Array(digest))
//     .map((v) => v.toString(16).padStart(2, "0"))
//     .join("");
// }

const Recommend: React.FC<{ history: BrowserHistory }> = (props) => {
  const { ids } = useParams()
  const [ID, setID] = useState<string[]>([])
  const [recommendRestaurants, setRecommendRestaurants] = useState([])
  //ここ両方のloadとerrorを一つで管理してしまっている。
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    const all_IDs = [ids, ...ID]
    const host = 'http://127.0.0.1:5000'
    fetch(`${host}/restaurant/:recommend/?ids=` + all_IDs.join(','))
      .then((result) => result.json())
      .then((restaurants) => {
        console.log(restaurants)
        setRecommendRestaurants(restaurants.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(true)
        setError(true)
      })
    // return () => {};
  }, [])

  if (loading) {
    return <div>loading</div>
  }

  if (error) {
    return <div>error</div>
  }

  // const { register, handleSubmit, setValue } = useForm();

  const fetchRestaurants = async () => {
    const all_IDs = [ids, ...ID]
    const res = await fetch(
      'http://127.0.0.1:5000/restaurant/:recommend/?ids=' + all_IDs.join(','),
    )

    const data = await res.json()
    return data.data
  }

  const handleClick = () => {
    const getRestaurants = async () => {
      const restaurantsData = await fetchRestaurants()
      setRecommendRestaurants(restaurantsData)
    }
    getRestaurants()
  }

  //   async function onSubmitStoreForm(value: {restaurant_id: string}) {
  //     // let restaurant_id = value["restaurant_id"];
  //     // let user_restaurant_data = {};
  //     // sha256(session.user.email).then(async function (hash) {
  //     //   user_restaurant_data["restaurant_id"] = restaurant_id;
  //     //   user_restaurant_data["user_email"] = hash;
  //     //   try {
  //     //     storeRestaurantDetails({
  //     //       variables: {
  //     //         restaurantId: restaurant_id,
  //     //         userEmail: hash,
  //     //       },
  //     //     });
  //     //     const target = document.getElementById(
  //     //       "store_restaurant" + restaurant_id
  //     //     );
  //     //     target.style.visibility = "hidden";
  //     //   } catch (error) {
  //     //     console.log(error);
  //     //   }
  //     // });
  //  }

  return (
    <>
      <h2>あなたが食べたい！と思ったお店</h2>
      <Wrapper>
        {recommendRestaurants.map((recommendRestaurant: Restaurant) => {
          //idsの対応
          console.log('ids', ids, 'ID', ID)
          const all_IDs = ids + ID.toString().replace(/,/g, '')
          console.log('all_IDs', all_IDs)
          if (all_IDs.indexOf(recommendRestaurant.restaurant_id) > -1) {
            return (
              <RestaurantCard>
                <ImageWrapper>
                  <RestaurantPhoto
                    src={recommendRestaurant.local_url}
                    alt="restaurant photo"
                  />
                </ImageWrapper>
                <Forms>
                  {/* <form onSubmit={handleSubmit(onSubmitStoreForm)}>
                    <input
                      type="hidden"
                      name="restaurant_store"
                      {...register('restaurant_id')}
                    />
                    <button
                      type="submit"
                      id={'store_restaurant' + recommendRestaurant.restaurant_id}
                      className={styles.restarunt_store}
                      onClick={() => {
                        setValue('restaurant_id', recommendRestaurant.restaurant_id)
                      }}
                    >
                      保存する
                    </button>
                  </form>
                  <form onSubmit={handleSubmit(onSubmitHaveBeenToForm)}>
                    <input
                      type="hidden"
                      name={'restaurant_have_been_to'}
                      value={JSON.stringify(recommendRestaurant)}
                      {...register('restaurant_have_been_to_id')}
                    />
                    <button
                      type="submit"
                      id={'have_been_to_restaurant' + recommendRestaurant.restaurant_id}
                      className={styles.restarunt_store}
                      onClick={() => {
                        setValue(
                          'restaurant_have_been_to_id',
                          recommendRestaurant.restaurant_id,
                        )
                      }}
                    >
                      行ったことある
                    </button>
                  </form> */}
                </Forms>

                {recommendRestaurant.restaurant_id != ids ? (
                  <RestaurantDelete>
                    <span>
                      <IconContext.Provider
                        value={{ size: '2em', color: 'white' }}
                      >
                        <a
                          onClick={() => {
                            const idx = ID.indexOf(
                              recommendRestaurant.restaurant_id,
                            )
                            setID(ID.filter((_, i) => i !== idx))
                            handleClick()
                          }}
                        >
                          <AiFillCloseCircle />
                        </a>
                      </IconContext.Provider>
                    </span>
                  </RestaurantDelete>
                ) : (
                  <div></div>
                )}

                <RecommendationDetails>
                  <RecommendationName>
                    {recommendRestaurant.restaurant_name}
                  </RecommendationName>
                  <div>{recommendRestaurant.score}</div>
                  <RecommendationDetailsRow>
                    <h3 className="">{recommendRestaurant.genre}</h3>
                    <CostStationRow>
                      <div>{recommendRestaurant.budget_lunch}</div>
                      <span>{recommendRestaurant.station}</span>
                    </CostStationRow>
                  </RecommendationDetailsRow>
                </RecommendationDetails>
              </RestaurantCard>
            )
          } else {
            return <div></div>
          }
        })}
      </Wrapper>
      <div style={{ margin: '0 auto', width: '80%' }}>
        <div>
          <a href={'/ranking/' + [ids, ...ID].join(',')}>
            <BsFillArrowRightCircleFill size={300} />
          </a>
        </div>
        <RecommendationDetails>
          <RecommendationName>あなたにおすすめの</RecommendationName>
          <RecommendationName>お店ランキングを作る！</RecommendationName>
        </RecommendationDetails>
      </div>

      <h2 style={{ width: '80%', margin: '40px auto 20px' }}>
        もっと、あなたの「食べたい！」お店をクリックしてみよう
      </h2>

      <Wrapper>
        {recommendRestaurants?.map((recommendRestaurant: Restaurant) => {
          const all_IDs = ids + ID.toString().replace(/,/g, '')
          console.log('下の方', all_IDs)
          if (all_IDs.indexOf(recommendRestaurant.restaurant_id) == -1) {
            return (
              <div>
                <a
                  onClick={() => {
                    setID([...ID, recommendRestaurant.restaurant_id])
                    handleClick()
                  }}
                >
                  <ImageWrapper>
                    <RestaurantPhoto
                      src={recommendRestaurant.local_url}
                      alt="restaurant photo"
                    />
                  </ImageWrapper>
                </a>
                <RecommendationDetails>
                  <RecommendationName>
                    <a
                      onClick={() => {
                        setID([...ID, recommendRestaurant.restaurant_id])
                        handleClick()
                      }}
                    >
                      {recommendRestaurant.restaurant_name}
                    </a>
                  </RecommendationName>
                  <div>{recommendRestaurant.score}</div>
                  <RecommendationDetailsRow>
                    <h3 className="">{recommendRestaurant.genre}</h3>
                    <CostStationRow>
                      <div>{recommendRestaurant.budget_lunch}</div>
                      <span>{recommendRestaurant.station}</span>
                    </CostStationRow>
                  </RecommendationDetailsRow>
                </RecommendationDetails>
              </div>
            )
          } else {
            return <div></div>
          }
        })}
      </Wrapper>
    </>
  )
}

export default Recommend
