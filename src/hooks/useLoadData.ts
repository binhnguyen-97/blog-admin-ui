/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";

interface IUseLoadDataProps<D> {
  initialState: D,
}

const useLoadData = <DataType>({
  initialState,
}: IUseLoadDataProps<DataType>) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataType>(initialState)

  const fetchSuccess = useCallback((data: DataType) => {
    setLoading(false)
    setData(data)
  }, [])

  const fetchFail = useCallback(() => {
    setLoading(false)
    setData(initialState)
  }, [])

  const fetchStart = useCallback(() => {
    setLoading(true)
  }, [])

  return { loading, data, fetchFail, fetchSuccess, fetchStart }
}


export default useLoadData
