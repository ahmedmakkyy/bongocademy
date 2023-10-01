import { useQuery } from '@tanstack/react-query';

const useClassDetails = () => {
  const{data: classes=[]} = useQuery({
    queryKey: ['approvedClasses'],
    queryFn: async () => {
      const response = await fetch(`https://bongo-sports-server.vercel.app/allApprovedClasses/${classes._id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })
  return [classes];
};

export default useClassDetails;