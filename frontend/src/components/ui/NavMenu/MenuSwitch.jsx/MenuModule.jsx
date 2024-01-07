import { selectedCourseSignal } from "../../SelectMenu/SelectLanguage/selectMenuSignal";
import { SelectMenu } from "../../SelectMenu/SelectMenu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function MenuModule() {
  const navigate = useNavigate();

  const handleMenu = () => {
    if (!selectedCourseSignal?.value?.name?.language)
      navigate(`/menu?language=$null&course=null&module=null`);
    if (
      !selectedCourseSignal?.value?.name?.language ||
      !selectedCourseSignal?.value?.selectedCourse ||
      !selectedCourseSignal?.value?.selectedModule
    )
      return;
    const language = encodeURIComponent(
      selectedCourseSignal.value.name.language.trim()
    );
    const course = encodeURIComponent(
      selectedCourseSignal.value.selectedCourse.trim()
    );
    const module = encodeURIComponent(
      selectedCourseSignal.value.selectedModule.trim()
    );
    navigate(`/menu?language=${language}&course=${course}&module=${module}`);
  };

  useEffect(() => {
    handleMenu();
  }, [selectedCourseSignal?.value?.selectedModule]);

  return (
    <div className="flex mt-6 flex-col w-full h-auto items-center justify-center">
      <div className="flex p-3 mb-12 w-full flex-row flex-wrap items-center justify-between max-w-[1536px]">
        <SelectMenu menu={selectedCourseSignal} />
      </div>
    </div>
  );
}
