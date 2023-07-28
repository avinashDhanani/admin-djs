import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  isAfter,
  parse,
  startOfToday,
} from "date-fns";
import { useSelector} from "react-redux";
import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TooltipItem = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0px 6px 13px 1px rgba(0, 0, 0, 0.2)",
    minWidth: "260px",
  },
}));

export default function Calendar({djCalendarList}) {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [showPrevBtn, setShowprevBtn] = useState(false);
  const [selectedDay, setSelectedDay] = useState(today);
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  library.add(faAngleLeft, faAngleRight);

  // memoizing the days of the entire month
  const days = useMemo(() => { 
    return eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    });
  }, [currentMonth]);
 
  useEffect(() => {
    if (
      firstDayCurrentMonth.getFullYear() ===
        new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).getFullYear() &&
      firstDayCurrentMonth.getMonth() ===
        new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).getMonth()
    ) {
      setShowNextBtn(true);
    } else if (
      firstDayCurrentMonth.getFullYear() ===
        new Date(
          new Date().setFullYear(new Date().getFullYear() - 1)
        ).getFullYear() &&
      firstDayCurrentMonth.getMonth() ===
        new Date(
          new Date().setFullYear(new Date().getFullYear() - 1)
        ).getMonth()
    ) {
      setShowprevBtn(true);
    } else {
      setShowNextBtn(false);
      setShowprevBtn(false);
    }
  }, [currentMonth, firstDayCurrentMonth]);

  function previousMonth() {
    let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className="md:grid">
      <div className="">
        <div className="flex justify-between pb-[16px]">
          <div className="flex">
            <button
              type="button"
              onClick={previousMonth}
              className={`outline-none ${
                showPrevBtn ? "invisible" : "visible"
              }`}
            >
              <span className="sr-only">Previous month</span>
              <FontAwesomeIcon icon={faAngleLeft} className="h-5 w-5" />
            </button>
            <h2 className=" font-inter text-[19px] font-semibold">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={nextMonth}
              type="button"
              className={`outline-none ${
                showNextBtn ? "invisible" : "visible"
              }`}
            >
              <span className="sr-only">Next month</span>
              <FontAwesomeIcon icon={faAngleRight} className="h-5 w-5" />
            </button>
          </div>
          <div className="flex space-x-4">
            <div className="text-[9px] flex items-center space-x-2">
              <span className="bg-mid-blue inline-block rounded-sm w-[13px] h-[10px]"></span>
              <span className="font-semibold">Open</span>
            </div>
            <div className="text-[9px] flex items-center space-x-2">
              <span className=" inline-block w-[13px] h-[10px]">
                <img
                  src="../assets/images/mount.jpg"
                  alt="booked"
                  className="object-cover rounded-sm "
                />
              </span>
              <span className="font-semibold">Booked</span>
            </div>
            <div className="text-[9px] flex items-center space-x-2">
              <span className="bg-gray-light inline-block rounded-sm w-[13px] h-[10px]"></span>
              <span className="font-semibold">OFF</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 font-inter text-black-darkest font-semibold text-xs ">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="mt-2 grid gap-1 grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "relative"
              )}
            >
              <TooltipContainer
                day={day}
                djCalendarList={djCalendarList}
                selectedDay={selectedDay}
                firstDayCurrentMonth={firstDayCurrentMonth}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}

const TooltipContainer = ({
  day,
  djCalendarList,
  selectedDay,
  firstDayCurrentMonth,
}) => {
  const [showTool, setShowTool] = useState(false);

  return (
      <button
        type="button"
        className={classNames(
          isEqual(day, selectedDay) && "text-black-darkest",
          !isEqual(day, selectedDay) && isToday(day) && "text-red-light",
          !isEqual(day, selectedDay) &&
            !isToday(day) &&
            isSameMonth(day, firstDayCurrentMonth) &&
            "text-gray-light",
          !isEqual(day, selectedDay) &&
            !isToday(day) &&
            !isSameMonth(day, firstDayCurrentMonth) &&
            "text-gray-dark",
          isEqual(day, selectedDay) && isToday(day) && "bg-red-light",
          isEqual(day, selectedDay) && !isToday(day) && "bg-gray-light",
          !isEqual(day, selectedDay) && "hover:bg-gray-dark",
          (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
          "rounded-xl"
        )}
      >
        {isAfter(new Date(), day) ? (
          <div className="relative">
            <div className="absolute left-0 right-0 top-[25%] text-black-darkest">
              {format(day, "dd")}
            </div>
            <img
              src="../assets/images/gray.png"
              alt="day"
              className="w-[54px] h-[41px] rounded-xl"
            />
          </div>
        ) : djCalendarList.some((booking) => {
          const date= booking.date.split('/')
          const DjDate= new Date(date[2],date[1]-1,date[0])
          
            const result =
              booking.status === "Off" && isSameDay(DjDate, day)
            return result;
          }) ? (
          <div className="relative">
            <div className="absolute left-0 right-0 top-[25%] text-black-darkest">
              {format(day, "dd")}
            </div>
            <img
              src="../assets/images/gray.png"
              alt="day"
              className="w-[54px] h-[41px] rounded-xl"
            />
          </div>
        ) : djCalendarList &&
          djCalendarList.some((booking) => {
            const date= booking.date.split('/')
            const DjDate= new Date(date[2],date[1]-1,date[0])
            
            const result =
              booking.status === "Accepted" && isSameDay(DjDate, day)
            return result;
          }) ? (
          <div className="relative">
            <div className="absolute left-0 right-0 top-[25%] text-white">
              {format(day, "dd")}
            </div>
            <img
              src="../assets/images/mount.jpg"
              alt="day"
              className="w-[54px] h-[41px] rounded-xl"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-0 right-0 top-[25%] text-white">
              {format(day, "dd")}
            </div>
            <img
              src="../assets/images/blue.png"
              alt="day"
              className="w-[54px] h-[41px] rounded-xl"
            />
          </div>
        )}
      </button>
  );
};

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
