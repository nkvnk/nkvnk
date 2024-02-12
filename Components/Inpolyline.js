
export default function Inpolyline() {
     //polylineについてのhookのコード
  const [coordinatesByDraw, setCoordinatesByDraw] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [mapScrollEnabled, setMapScrollEnabled] = useState(true);
const index=useRef(0);

  const handleDraw = useCallback((event) => {
    if (drawing) {
      index.current++;
      if(index.current%7===0)return;
      const { coordinate } = event.nativeEvent;
      setCoordinatesByDraw((prev) => [...prev, coordinate]);
    }
  }, [coordinatesByDraw]);
  

  const toggleDrawing = () => {
    setDrawing((prev) => !prev);
    setMapScrollEnabled((prev) => !prev);
    if (!drawing) {
      setCoordinatesByDraw([]);
    }
  };

  const navigation = useNavigation("");
  const start = () => {
    
    closeModal();
    navigation.navigate("make");
   
  };
  
}
