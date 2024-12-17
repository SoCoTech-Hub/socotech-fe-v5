import { Card, CardContent } from "../card";

export interface Material {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
}

export interface HelpfulMaterialsProps {
  materials: Material[];
}

const HelpfulMaterials: React.FC<HelpfulMaterialsProps> = ({ materials }) => {
  const handleCardClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold">Helpful Materials</h3>
      <div className="space-y-4">
        {materials.map((material) => (
          <Card key={material.id} onClick={() => handleCardClick(material.url)}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {material.icon}
                <div>
                  <h4 className="font-medium">{material.title}</h4>
                  <p className="text-sm">{material.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HelpfulMaterials;
