// components
import ListingSkeleton from "../../../../components/skeletons/listing/ListingSkeleton"

// context
import ListingContextProvider from "../../../../components/listing/context/ListingContext"

const ProfileListing = ({ children, useListing }) => {
  const { title, cards, isLoading } = useListing()

  return isLoading ? (
    <ListingSkeleton
      titleFallback={title.main}
      cardsCounter={6}
    />
  ) : (
    <ListingContextProvider initialState={{ title, cards }} CustomErrorFallbackComponent={() => <></>}>
      {children}
    </ListingContextProvider>
  )
}

export default ProfileListing
