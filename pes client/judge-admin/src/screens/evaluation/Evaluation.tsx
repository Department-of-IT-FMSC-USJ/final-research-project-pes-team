import { useState } from "react";
import { FiFlag } from "react-icons/fi";
import { Dropdown } from "../../components/dropdown/Dropdown";
import "./evaluation.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../utils/useAxios";
import { useEventStore } from "../../store/eventStore";
import Loading from "../../components/loading/Loading";
import { useEffect } from "react";
import { FiRotateCw, FiPause, FiPlay } from "react-icons/fi";

export const Evaluation = () => {
  const eventId = useEventStore((state) => state.eventId);
  const [memberId, setMemberId] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [marks, setMarks] = useState<Record<number, number>>({});
  const [isScanning, setIsScanning] = useState(false);

  const INITIAL_MINUTES = 10;
  const INITIAL_SECONDS = 0;

  const [minutes, setMinutes] = useState(INITIAL_MINUTES);
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  const queryClient = useQueryClient();
  const { FetchData } = useAxios();

  const { data: espData, isLoading: scanLoading } = useQuery({
    queryKey: ["espData"],
    queryFn: () =>
      FetchData({
        url: "/esp/esp-activity",
        method: "GET",
      }),

    enabled: true,
    refetchInterval: 2000, // Refetch every 5 seconds
    refetchOnWindowFocus: true,
  });


 useEffect(() => {
  if (espData) {
    const { eventId: newEventId, sessionId: newSessionId, memberId: newMemberId } = espData;

    const isNewScan =
      newEventId &&
      newSessionId &&
      newMemberId &&
      (newEventId !== eventId ||
        newSessionId !== sessionId ||
        newMemberId !== memberId);

    if (isNewScan) {
      useEventStore.getState().setEventId(newEventId);
      setSessionId(newSessionId);
      setMemberId(newMemberId);
      setMarks({});
      resetTimer();
      setIsScanning(true); 
    }
  }
}, [espData, eventId, sessionId, memberId]);


  

  const { data: eventData, isLoading } = useQuery({
    queryKey: ["events", eventId],
    enabled: !!eventId,
    refetchOnWindowFocus: false,
    queryFn: () =>
      FetchData({
        url: `/events/${eventId}`,
        method: "GET",
      }),
  });

  const sessionOptions =
    eventData?.sessions?.map((session: any) => ({
      label: session.name,
      value: session.id,
    })) || [];

  const presenterOptions =
    eventData?.sessions
      ?.find((s: any) => s.id === sessionId)
      ?.presenters?.flatMap((presenter: any) =>
        presenter.members?.map((member: any) => ({
          label: member.name,
          value: member.id,
        }))
      ) || [];

  // fetch filtered member details
  const { data: membersData, isLoading: isMembersLoading } = useQuery({
    queryKey: ["filtered-member", eventId, sessionId, memberId],
    enabled: !!eventId && !!sessionId && !!memberId,
    refetchOnWindowFocus: false,
    queryFn: () =>
      FetchData({
        url: `/events/${eventId}/filter-member?sessionId=${sessionId}&memberId=${memberId}`,
        method: "GET",
      }),
  });

  const presenter = membersData?.sessions?.[0]?.presenters?.[0] || null;
  const member = presenter?.members?.[0] || null;
  const criteriaList = eventData?.criteriaList || [];

  const handleMarkChange = (criteriaId: number, value: number) => {
    setMarks((prev) => ({
      ...prev,
      [criteriaId]: value,
    }));
  };

  const totalMarks = criteriaList.reduce(
    (sum: number, c: any) => sum + (marks[c.id] ?? 0),
    0
  );

  const { mutateAsync: saveMarks, isPending } = useMutation({
    mutationFn: () =>
      FetchData({
        url: `/members/${memberId}`,
        method: "PATCH",
        data: {
          marks: totalMarks,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criteria", memberId] });
      alert("Marks saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["filtered-member", eventId] });
    },
    onError: (error) => {
      console.error("Error saving marks:", error);
      alert("Failed to save marks. Please try again.");
    },
  });

  const handleSubmit = () => {
    if (memberId && totalMarks >= 0) {
      saveMarks();
    }
  };

  const handleCancel = () => {
    setMarks({});
  };

  //coundown timer

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((s) => s - 1);
      } else {
        if (minutes === 0) {
          clearInterval(timer);
          return;
        }
        setMinutes((m) => m - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds, isRunning]);

  const resetTimer = () => {
    setMinutes(INITIAL_MINUTES);
    setSeconds(INITIAL_SECONDS);
    setIsRunning(false);
  };

useEffect(() => {
  if (!isMembersLoading && isScanning) {
    const timeout = setTimeout(() => {
      setIsScanning(false);
    }, 500); 

    return () => clearTimeout(timeout); 
  }
}, [isMembersLoading, isScanning]);



  return (
    <div id="evaluation-screen">
      <div className="table">
        <div className="table-header">
          <div className="table-header-left">
            <div className="timer-container">
              <div className="timer-box">
                <div className="time-block">
                  {String(minutes).padStart(2, "0")}
                </div>
                <div className="time-colon">:</div>
                <div className="time-block">
                  {String(seconds).padStart(2, "0")}
                </div>
              </div>
              <div className="timer-controls">
                {isRunning ? (
                  <FiPause
                    className="timer-icon"
                    onClick={() => setIsRunning(false)}
                  />
                ) : (
                  <FiPlay
                    className="timer-icon"
                    onClick={() => setIsRunning(true)}
                  />
                )}
                <FiRotateCw onClick={resetTimer} className="timer-icon" />
              </div>
            </div>
          </div>
          <div className="table-header-right">
            <Dropdown
              styles={{
                padding: "9px 20px",
                boxShadow: "0px 0px 3.7px 1px rgba(0, 0, 0, 0.10)",
                width: "200px",
              }}
              label="Select Session"
              startIcon={<FiFlag />}
              options={sessionOptions}
              isLoading={isLoading}
              onChange={(value) => setSessionId(value ? Number(value) : null)}
            />
            <Dropdown
              styles={{
                padding: "9px 20px",
                boxShadow: "0px 0px 3.7px 1px rgba(0, 0, 0, 0.10)",
                width: "200px",
              }}
              label="Select Member"
              startIcon={<FiFlag />}
              options={presenterOptions}
              isLoading={isLoading}
              onChange={(value) => setMemberId(value ? Number(value) : null)}
            />
          </div>
        </div>

        <div className="table-body">
     
          {isMembersLoading || isScanning ? (
            <Loading />
          ) : member && criteriaList.length > 0 ? (
            <div className="evaluation-wrapper">
              <table className="evaluation-table">
                <thead>
                  <tr>
                    <th>Member name</th>
                    {criteriaList.map((c: any) => (
                      <th key={c.id}>{c.name}</th>
                    ))}
                    <th>Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{member.name}</td>
                    {criteriaList.map((c: any) => (
                      <td key={c.id}>
                        <select
                          value={marks[c.id] ?? 0}
                          onChange={(e) =>
                            handleMarkChange(c.id, Number(e.target.value))
                          }
                        >
                          {Array.from({ length: 11 }, (_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </td>
                    ))}
                    <td>{totalMarks}</td>
                  </tr>
                </tbody>
              </table>

              <div className="evaluation-actions">
                <button className="btn-cancel" onClick={handleCancel}>
                  Reset Marks
                </button>
                <button className="btn-submit" onClick={handleSubmit}>
                  Save & Send Marks
                </button>
              </div>
            </div>
          ) : (
            sessionId &&
            memberId && (
              <p className="no-data">No criteria or member data available.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};
